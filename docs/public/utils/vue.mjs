export const withInstall = (main, extra) => {
  ;
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      const name = comp.name || comp.__name;
      if (name) {
        app.component(name, comp);
      }
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;
      main[key] = comp;
    }
  }
  return main;
};
export const withNoopInstall = (component) => {
  ;
  component.install = () => {
  };
  return component;
};
export const withInstallFunction = (fn, name) => {
  const func = fn;
  func.install = (app) => {
    app.config.globalProperties[name] = func;
  };
  return func;
};
export const withInstallDirective = (directive, name) => {
  const dir = directive;
  dir.install = (app) => {
    app.directive(name, dir);
  };
  return dir;
};
export const withInstallAll = (components, directives) => {
  return {
    install(app) {
      components.forEach((component) => {
        const name = component.name || component.__name;
        if (name) {
          app.component(name, component);
        }
      });
      if (directives) {
        Object.entries(directives).forEach(([name, directive]) => {
          app.directive(name, directive);
        });
      }
    }
  };
};
