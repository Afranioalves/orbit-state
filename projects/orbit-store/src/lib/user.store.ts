import { Injectable } from '@angular/core';
import { Store } from './store';

interface UserState {
    user: any;
    token: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class UserStore extends Store<UserState> {

    constructor() {
        super({
            user: null,
            token: null
        });
    }

    setUser(user: any) {
        this.patchState({ user });
    }

    setToken(token: string) {
        this.patchState({ token });
    }

    logout() {
        this.setState({
            user: null,
            token: null
        });
    }

}
