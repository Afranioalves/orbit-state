import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Store<T> {

  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(initialState);
  }

  getState(): T {
    return this.state$.getValue();
  }

  select(): Observable<T> {
    return this.state$.asObservable();
  }

  setState(newState: T): void {
    this.state$.next(newState);
  }

  patchState(partialState: Partial<T>): void {
    const current = this.getState();

    this.state$.next({
      ...current,
      ...partialState
    });
  }

  selectSlice<K extends keyof T>(key: K): Observable<T[K]> {
  return this.state$.pipe(
    map(state => state[key])
  );
}
}
