import { QUESTIONS, TOPICS } from './data/questions.js';

const STORAGE_KEY = 'aqa_gcse_cs_progress';
const API_KEY_STORAGE = 'vercel_ai_gateway_key';
const POOL_OPTIONS = {
  all: 'All questions',
  unanswered: 'Unanswered',
  answeredWrong: 'Answered wrong',
  unansweredOrIncorrect: 'Unanswered / incorrectly answered'
};

const state = {
  selectedTopics: [...TOPICS],
  poolFilter: 'all',
  questionLimit: 8,
  orderMode: 'random',
  progress: loadJson(STORAGE_KEY, {}),
  apiKey: localStorage.getItem(API_KEY_STORAGE) || '',
  sessionQuestions: [],
  currentIndex: 0,
  selectedIndex: null,
  showHint: false,
  aiExplanation: ''
};

const elements = {
  topicList: document.querySelector('#topicList'),
  poolFilter: document.querySelector('#poolFilter'),
  questionLimit: document.querySelector('#questionLimit'),
  orderMode: document.querySelector('#orderMode'),
  availableCount: document.querySelector('#availableCount'),
  emptyState: document.querySelector('#emptyState'),
  quizView: document.querySelector('#quizView'),
  badgeRow: document.querySelector('#badgeRow'),
  questionText: document.querySelector('#questionText'),
  optionsContainer: document.querySelector('#optionsContainer'),
  answerFeedback: document.querySelector('#answerFeedback'),
  hintBox: document.querySelector('#hintBox'),
  builtInExplanation: document.querySelector('#builtInExplanation'),
  aiExplanation: document.querySelector('#aiExplanation'),
  toggleHintBtn: document.querySelector('#toggleHintBtn'),
  askAiBtn: document.querySelector('#askAiBtn'),
  previousBtn: document.querySelector('#previousBtn'),
  nextBtn: document.querySelector('#nextBtn'),
  unattemptedCount: document.querySelector('#unattemptedCount'),
  correctCount: document.querySelector('#correctCount'),
  correctMoreCount: document.querySelector('#correctMoreCount'),
  incorrectCount: document.querySelector('#incorrectCount'),
  apiKeyInput: document.querySelector('#apiKeyInput')
};

elements.apiKeyInput.value = state.apiKey;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  renderStats();
}

function saveApiKey() {
  localStorage.setItem(API_KEY_STORAGE, elements.apiKeyInput.value.trim());
  state.apiKey = elements.apiKeyInput.value.trim();
  renderQuestion();
}

function getProgressEntry(questionId) {
  return state.progress[questionId] || { attempts: 0, correctCount: 0, incorrectCount: 0 };
}

function getProgressState(questionId) {
  const entry = getProgressEntry(questionId);
  if (!entry.attempts) return 'unattempted';
  if (entry.correctCount > 1) return 'correct-more-than-once';
  if (entry.correctCount === 1 && entry.incorrectCount === 0) return 'correct';
  if (entry.correctCount >= 1) return 'correct-more-than-once';
  return 'incorrect';
}

function renderTopics() {
  elements.topicList.innerHTML = '';
  TOPICS.forEach((topic) => {
    const label = document.createElement('label');
    label.className = 'topic-item';
    label.innerHTML = `<input type="checkbox" ${state.selectedTopics.includes(topic) ? 'checked' : ''}><span>${topic}</span>`;
    label.querySelector('input').addEventListener('change', (event) => {
      if (event.target.checked) {
        state.selectedTopics.push(topic);
      } else if (state.selectedTopics.length > 1) {
        state.selectedTopics = state.selectedTopics.filter((item) => item !== topic);
      } else {
        event.target.checked = true;
      }
      updateAvailableCount();
    });
    elements.topicList.appendChild(label);
  });
}

function renderPoolOptions() {
  Object.entries(POOL_OPTIONS).forEach(([value, label]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    elements.poolFilter.appendChild(option);
  });
}

function updateAvailableCount() {
  const available = getAvailableQuestions();
  elements.availableCount.textContent = `Available in current pool: ${available.length} question(s).`;
  elements.questionLimit.max = Math.max(1, available.length);
  if (Number(elements.questionLimit.value) > available.length && available.length > 0) {
    elements.questionLimit.value = available.length;
    state.questionLimit = available.length;
  }
}

function getAvailableQuestions() {
  return QUESTIONS.filter((question) => {
    if (!state.selectedTopics.includes(question.topic)) return false;
    const status = getProgressState(question.id);
    if (state.poolFilter === 'all') return true;
    if (state.poolFilter === 'unanswered') return status === 'unattempted';
    if (state.poolFilter === 'answeredWrong') return status === 'incorrect';
    return status === 'unattempted' || status === 'incorrect';
  });
}

function buildSession() {
  let pool = [...getAvailableQuestions()];
  if (!pool.length) {
    alert('No questions match the current topic and category filters.');
    return;
  }
  if (state.orderMode === 'random') pool = shuffle(pool);
  if (state.orderMode === 'topic') pool.sort((a, b) => a.topic.localeCompare(b.topic) || a.subtopic.localeCompare(b.subtopic));
  const limit = Math.max(1, Math.min(Number(state.questionLimit) || 1, pool.length));
  state.sessionQuestions = pool.slice(0, limit);
  state.currentIndex = 0;
  state.selectedIndex = null;
  state.showHint = false;
  state.aiExplanation = '';
  renderQuestion();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function answerQuestion(index) {
  const question = state.sessionQuestions[state.currentIndex];
  if (!question || state.selectedIndex !== null) return;
  state.selectedIndex = index;
  const correct = index === question.answerIndex;
  const previous = getProgressEntry(question.id);
  state.progress[question.id] = {
    attempts: previous.attempts + 1,
    correctCount: previous.correctCount + (correct ? 1 : 0),
    incorrectCount: previous.incorrectCount + (correct ? 0 : 1),
    lastSelectedIndex: index,
    lastUpdated: new Date().toISOString()
  };
  saveProgress();
  renderQuestion();
}

function renderStats() {
  const counts = { unattempted: 0, correct: 0, 'correct-more-than-once': 0, incorrect: 0 };
  QUESTIONS.forEach((question) => {
    counts[getProgressState(question.id)] += 1;
  });
  elements.unattemptedCount.textContent = counts.unattempted;
  elements.correctCount.textContent = counts.correct;
  elements.correctMoreCount.textContent = counts['correct-more-than-once'];
  elements.incorrectCount.textContent = counts.incorrect;
}

function renderQuestion() {
  const question = state.sessionQuestions[state.currentIndex];
  const hasQuestion = Boolean(question);
  elements.emptyState.classList.toggle('hidden', hasQuestion);
  elements.quizView.classList.toggle('hidden', !hasQuestion);
  if (!question) return;

  const status = getProgressState(question.id);
  elements.badgeRow.innerHTML = [
    `Question ${state.currentIndex + 1} of ${state.sessionQuestions.length}`,
    question.topic,
    question.subtopic,
    question.difficulty,
    status.replaceAll('-', ' ')
  ].map((item) => `<span class="badge">${item}</span>`).join('');

  elements.questionText.textContent = question.question;
  elements.optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option';
    button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;
    if (state.selectedIndex !== null) {
      if (index === state.selectedIndex && index === question.answerIndex) button.classList.add('correct-selected');
      if (index === state.selectedIndex && index !== question.answerIndex) button.classList.add('incorrect-selected');
      if (index !== state.selectedIndex && index === question.answerIndex) button.classList.add('correct-reveal');
    }
    button.addEventListener('click', () => answerQuestion(index));
    elements.optionsContainer.appendChild(button);
  });

  const answered = state.selectedIndex !== null;
  elements.answerFeedback.className = `feedback ${answered ? '' : 'hidden'} ${state.selectedIndex === question.answerIndex ? 'correct' : 'incorrect'}`;
  elements.answerFeedback.textContent = answered
    ? state.selectedIndex === question.answerIndex
      ? 'Correct — the selected answer is shown in green.'
      : 'Incorrect — your choice is red and the correct answer is highlighted in green.'
    : '';

  elements.hintBox.classList.toggle('hidden', !state.showHint);
  elements.hintBox.innerHTML = `<strong>Hint:</strong> ${question.hint}`;
  elements.toggleHintBtn.textContent = state.showHint ? 'Hide hint' : 'Show hint';

  elements.builtInExplanation.classList.toggle('hidden', !answered);
  elements.builtInExplanation.innerHTML = `<strong>Built-in explanation:</strong> ${question.rationale}`;

  elements.aiExplanation.classList.toggle('hidden', !state.aiExplanation);
  elements.aiExplanation.innerHTML = state.aiExplanation ? `<strong>AI explanation:</strong><br>${state.aiExplanation}` : '';

  elements.askAiBtn.disabled = !answered || !state.apiKey;
  elements.askAiBtn.textContent = state.apiKey ? 'Ask AI to explain' : 'Add API key to use AI';
  elements.previousBtn.disabled = state.currentIndex === 0;
  elements.nextBtn.disabled = state.currentIndex >= state.sessionQuestions.length - 1;
}

async function askAi() {
  const question = state.sessionQuestions[state.currentIndex];
  if (!question || state.selectedIndex === null || !state.apiKey) return;
  elements.askAiBtn.disabled = true;
  elements.askAiBtn.textContent = 'Generating explanation...';
  elements.aiExplanation.classList.remove('hidden');
  elements.aiExplanation.innerHTML = '<strong>AI explanation:</strong><br>Loading...';

  const prompt = [
    'You are a helpful AQA GCSE Computer Science tutor.',
    `Topic: ${question.topic}`,
    `Question: ${question.question}`,
    `Options: ${question.options.map((option, index) => `${index}: ${option}`).join(' | ')}`,
    `Student selected option index: ${state.selectedIndex}`,
    `Correct option index: ${question.answerIndex}`,
    `Hint: ${question.hint}`,
    `Built-in explanation: ${question.rationale}`,
    'Explain briefly why the correct answer is right and why the other options are not the best answers. Use GCSE-friendly bullet points.'
  ].join('\n');

  try {
    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        temperature: 0.3,
        messages: [
          { role: 'system', content: 'You are a patient and accurate GCSE Computer Science tutor.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    state.aiExplanation = (data.choices?.[0]?.message?.content || 'No explanation returned.').replace(/\n/g, '<br>');
  } catch (error) {
    state.aiExplanation = `Unable to get AI explanation. ${error.message || 'Unknown error.'}`;
  }

  renderQuestion();
}

function moveQuestion(direction) {
  const nextIndex = state.currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= state.sessionQuestions.length) return;
  state.currentIndex = nextIndex;
  state.selectedIndex = null;
  state.showHint = false;
  state.aiExplanation = '';
  renderQuestion();
}

document.querySelector('#selectAllTopicsBtn').addEventListener('click', () => {
  state.selectedTopics = [...TOPICS];
  renderTopics();
  updateAvailableCount();
});

document.querySelector('#clearTopicsBtn').addEventListener('click', () => {
  state.selectedTopics = [TOPICS[0]];
  renderTopics();
  updateAvailableCount();
});

document.querySelector('#startQuizBtn').addEventListener('click', buildSession);
document.querySelector('#saveProgressBtn').addEventListener('click', saveProgress);
document.querySelector('#saveApiKeyBtn').addEventListener('click', saveApiKey);
elements.poolFilter.addEventListener('change', (event) => { state.poolFilter = event.target.value; updateAvailableCount(); });
elements.questionLimit.addEventListener('change', (event) => { state.questionLimit = Number(event.target.value) || 1; });
elements.orderMode.addEventListener('change', (event) => { state.orderMode = event.target.value; });
elements.toggleHintBtn.addEventListener('click', () => { state.showHint = !state.showHint; renderQuestion(); });
elements.askAiBtn.addEventListener('click', askAi);
elements.previousBtn.addEventListener('click', () => moveQuestion(-1));
elements.nextBtn.addEventListener('click', () => moveQuestion(1));

renderTopics();
renderPoolOptions();
renderStats();
updateAvailableCount();
renderQuestion();
