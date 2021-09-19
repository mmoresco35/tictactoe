// test unitarios de la logica de negocio, dejo tres generados con dos ok y un fallo
import {getWinner,bestMove} from './logic'


test('getwinner gana X', () => {
  expect(getWinner(["X","X","X","","","","","",""])).toBe(true);
});
//fallo 
test('getwinner gana X', () => {
  expect(getWinner(["X","X","","","","","","",""])).toBe(true);
});

test('mejor movimiento va a ganar X', () => {
  expect(bestMove(["X","X","","","","0","","",""], 0)).toBe(2);
});