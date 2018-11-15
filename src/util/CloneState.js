export function cloneState(func) {
    this.cloneState = {...this.state};

    func()

    this.setState(this.cloneState);
}