// Intentional separate learner bug. The supplied adapter does not use this.
// Input is untrusted JSON text; return true only for the exact scenario contract.
import { coachScenario } from '../src/scenarios.mjs';

const requiredFields = ['kind', 'ruleId', 'cardId', 'explanation'];

export function acceptAnswer(text, scenarioId) {
  const scenario = coachScenario(scenarioId);
  if (!scenario || typeof text !== 'string') {
    return false;
  }

  let answer;
  try {
    answer = JSON.parse(text);
  } catch {
    return false;
  }

  if (answer === null || typeof answer !== 'object' || Array.isArray(answer)) {
    return false;
  }

  if (
    Object.keys(answer).length !== requiredFields.length ||
    !requiredFields.every((field) => Object.hasOwn(answer, field))
  ) {
    return false;
  }

  const expectedCardId = scenario.id === 'suggest' ? 'practice-red-3' : null;

  return (
    answer.kind === scenario.kind &&
    answer.ruleId === scenario.rule &&
    answer.cardId === expectedCardId &&
    typeof answer.explanation === 'string' &&
    answer.explanation.length >= 10 &&
    answer.explanation.length <= 1200
  );
}