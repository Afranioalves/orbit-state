import { Store } from './store';
import { map } from 'rxjs/operators';

interface TestState {
  count: number;
  name: string;
}

describe('Store', () => {

  let store: Store<TestState>;

  beforeEach(() => {
    store = new Store<TestState>({
      count: 0,
      name: 'initial'
    });
  });

  // --- Teste 1: criação do store ---
  it('should create store with initial state', () => {
    expect(store.getState()).toEqual({ count: 0, name: 'initial' });
  });

  // --- Teste 2: setState substitui o estado ---
  it('should update state with setState', () => {
    store.setState({ count: 10, name: 'updated' });
    expect(store.getState()).toEqual({ count: 10, name: 'updated' });
  });

  // --- Teste 3: patchState atualiza parcialmente ---
  it('should patch partial state', () => {
    store.patchState({ count: 5 });
    expect(store.getState()).toEqual({ count: 5, name: 'initial' });

    store.patchState({ name: 'patched' });
    expect(store.getState()).toEqual({ count: 5, name: 'patched' });
  });

  // --- Teste 4: observable emite mudanças ---
  it('should emit new state when updated', (done) => {
    store.select().subscribe(state => {
      if (state.count === 7) {
        expect(state).toEqual({ count: 7, name: 'initial' });
        done
     
      }
    });

    store.patchState({ count: 7 });
  });

  // --- Teste 5: selectSlice funciona corretamente ---
  it('should select slice of state', (done) => {
    store.selectSlice('name').subscribe(value => {
      if (value === 'patched') {
        expect(value).toBe('patched');
        done;
      }
    });

    store.patchState({ name: 'patched' });
  });

});
