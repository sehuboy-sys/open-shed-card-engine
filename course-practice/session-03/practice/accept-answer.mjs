import { coachScenario } from '../src/scenarios.mjs';

// Input is untrusted JSON text; return true only for the exact scenario contract.
export function acceptAnswer(text, scenarioId) {
  const scenario = coachScenario(scenarioId);
  if (!scenario) return false;

  let answer;
  try {
    answer = JSON.parse(text);
  } catch {
    return false;
  }
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false;

  const expectedCardId = scenario.kind === 'suggest' ? 'practice-red-3' : null;
  return Object.keys(answer).length === 4 &&
    answer.kind === scenario.kind &&
    answer.ruleId === scenario.rule &&
    answer.cardId === expectedCardId &&
    typeof answer.explanation === 'string' &&
    answer.explanation.length >= 10 &&
    answer.explanation.length <= 1200;
}
