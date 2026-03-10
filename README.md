# Orbit Store

<p align="center">
Simple, typed and reactive state management for Angular applications.
</p>

<p align="center">

<!-- ![npm](https://img.shields.io/npm/v/orbit-store) -->

![license](https://img.shields.io/npm/l/orbit-store)
![downloads](https://img.shields.io/npm/dm/orbit-store)
![angular](https://img.shields.io/badge/angular-%3E%3D16-red)

</p>

---

## ✨ What is Orbit Store

**Orbit Store** is a lightweight state management library for Angular applications.

It allows you to create **typed and reactive stores** to share state between components without excessive boilerplate.

The library was created to provide:

* simple global state
* strong typing with TypeScript
* natural integration with Angular
* less complexity than large state management solutions

Internally, the library uses **RxJS**.

---

# 📦 Installation

```bash
npm install orbit-store
```

---

## 🧠 How it works

The Orbit Store flow is simple:

```
Store
  ↓
Observable
  ↓
Component
  ↓
Template
```

Visual architecture:

```
        ┌───────────────┐
        │   UserStore   │
        │    (state)    │
        └──────┬────────┘
               │
               │ Observable
               ▼
        ┌───────────────┐
        │   Component   │
        │   (Angular)   │
        └──────┬────────┘
               │
               ▼
        ┌───────────────┐
        │   Template    │
        │   async pipe  │
        └───────────────┘
```

---

# 🧩 Library Components

Orbit Store has three main elements.

### Store

A class responsible for holding the application state.

### State

An interface that defines the structure of the data.

### StoreRegistry

Responsible for managing global store instances.

---

## 🚀 Creating a Store

### Defining the state

```ts
export interface UserState {

  user: {
    name: string
    email: string
  } | null

  token: string | null

}
```

---

### Creating the Store

```ts
import { Store } from 'orbit-store'

export class UserStore extends Store<UserState> {

  constructor() {
    super({
      user: null,
      token: null
    })
  }

  setUser(user: any) {
    this.patchState({ user })
  }

  setToken(token: string) {
    this.patchState({ token })
  }

  logout() {
    this.setState({
      user: null,
      token: null
    })
  }

}
```

---

## 🔵 Method 1 — Using StoreRegistry

This approach creates **global singleton stores** without relying on Angular’s dependency injection system.

It is useful when you want to access the store **from anywhere in the application**, including services, helpers, or utilities.

---

## Getting the store

```ts
import { StoreRegistry } from 'orbit-store'
import { UserStore } from './user.store'

const userStore = StoreRegistry.get(UserStore)
```

Whenever you call:

```
StoreRegistry.get(UserStore)
```

you will always receive **the same store instance**.

---

## Using it in a component

```ts
import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { StoreRegistry } from 'orbit-store'
import { UserStore, UserState } from './user.store'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userState$: Observable<UserState> = StoreRegistry.get(UserStore).select()

  login() {
    StoreRegistry.get(UserStore).setUser({
      name: 'John Doe',
      email: 'john.doe@mail.com'
    })

  }

}
```

---

## Template

```html
<div *ngIf="userState$ | async as state">

  <p>Name: {{ state.user?.name }}</p>
  <p>Email: {{ state.user?.email }}</p>

</div>
```

---

## 🟢 Method 2 — Using Dependency Injection (Angular DI)

Another way to use Orbit Store is through Angular's **dependency injection system**.

In this case, the store behaves like an **Angular service**.

---

## Making the store injectable

```ts
import { Injectable } from '@angular/core'
import { Store } from 'orbit-store'

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<UserState> {

  constructor() {
    super({
      user: null,
      token: null
    })
  }

}
```

---

## Using it in a component

```ts
import { Component } from '@angular/core'
import { UserStore } from './user.store'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userState$ = this.userStore.select()

  constructor(private userStore: UserStore) {}

  login() {

    this.userStore.setUser({
      name: 'John Doe'
    })

  }

}
```

---

## ⚖️ When to use each approach

| Approach             | When to use                                       |
| -------------------- | ------------------------------------------------- |
| StoreRegistry        | When you want to access the store outside Angular |
| Dependency Injection | When you want to follow the Angular pattern       |

Both approaches work perfectly with Orbit Store.

---

## 📚 Store API

### select()

Returns the state as an observable.

```ts
store.select()
```

---

### getState()

Returns the current state.

```ts
const state = store.getState()
```

---

### setState()

Replaces the entire state.

```ts
store.setState({
  user: null
})
```

---

### patchState()

Updates the state partially.

```ts
store.patchState({
  token: '123'
})
```

---

## 🧪 Simple example

### store

```ts
export class CounterStore extends Store<{count:number}> {

  constructor() {
    super({ count: 0 })
  }

  increment() {
    const state = this.getState()
    this.patchState({ count: state.count + 1 })
  }

}
```

---

### component

```ts
counter$ = StoreRegistry.get(CounterStore).select()

increment() {
  StoreRegistry.get(CounterStore).increment()
}
```

---

### template

```html
<button (click)="increment()">+</button>

<div *ngIf="counter$ | async as state">
  {{ state.count }}
</div>
```

---

## 🤝 Contributing

Contributions are welcome.

```
fork
create branch
commit
open pull request
```

---

## 📜 License

MIT
