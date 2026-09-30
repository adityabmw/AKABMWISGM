export const Router = { routes: {}, current: null,
  register(mod){ this.routes[mod.name]=mod; },
  init(){ console.log('[Router] modules:', Object.keys(this.routes).length); }
};
