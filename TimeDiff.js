class TimeDiff {
  constructor (config,resetFunction, returnFunction) {
   //private
    this._lastTime = 0;
    this._config = config || { minimum: 500 };
    this._resetFunction = typeof resetFunction === 'function' ? resetFunction : result => result;
    this._returnFunction = typeof returnFunction === 'function' ? returnFunction : diff => diff >= this._config.minimum;
    //public
    this.hasElapsed = function () {
      const thisTime = Date.now();
      const diff = thisTime - this._lastTime;
      const result = this._returnFunction(diff);
      if (this._resetFunction(result)) {
        this._lastTime = thisTime;
      }
      return result;
    };
  }
}