/**
 * Session 1 teaching exercise, using invented data only.
 * This suggests a card ID; it does not decide the rules or play a move.
 */
export function recommendCard(view) {
  if (view.legalActions.playableCardIds.length === 0) return null;

  // Use the choices permitted by the game's rules engine.
  return view.legalActions.playableCardIds[0] ?? null;
}
