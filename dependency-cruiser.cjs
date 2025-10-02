module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'This dependency is part of a circular relationship. You might want to revise your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      comment: 'This is an orphan module - it\'s likely not used (anymore?).',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)(node_modules|src/vendor)/'
        ]
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      comment: 'A module depends on a node core module that has been deprecated. Find an alternative - these are bound to exist - node doesn\'t deprecate lightly.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'core'
        ],
        path: [
          '^(punycode|domain|constants|sys|_linklist|_stream_wrap)$'
        ]
      }
    },
    {
      name: 'not-to-deprecated',
      comment: 'Don\'t allow dependencies on modules that have been deprecated.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'deprecated'
        ]
      }
    },
    {
      name: 'no-non-package-json',
      comment: 'Don\'t allow dependencies on modules that don\'t exist in package.json',
      severity: 'error',
      from: {},
      to: {
        dependencyTypes: [
          'npm'
        ],
        pathNot: [
          '^[^.]'
        ]
      }
    },
    {
      name: 'not-to-unresolvable',
      comment: 'Don\'t allow dependencies on modules that cannot be found (i.e. typed modules missing their implementation file)',
      severity: 'error',
      from: {},
      to: {
        dependencyTypes: [
          'npm'
        ],
        path: [
          '^[^.]'
        ]
      }
    },
    {
      name: 'no-duplicate-dep-types',
      comment: 'Likely this module depends on an external (\'npm\') module that occurs more than once in your package.json i.e. both as a devDependencies and in dependencies. This will cause maintenance problems later on.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'npm'
        ]
      }
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment: 'Don\'t allow dependencies from src/app to src/shared (only the other way around). Or its devDependencies - they\'re only available when you\'re developing or building.',
      from: {
        path: '^src/(app|processes|pages|features|entities)/'
      },
      to: {
        path: '^src/shared/',
        dependencyTypes: [
          'npm',
          'npm-dev'
        ]
      }
    },
    {
      name: 'not-to-src',
      comment: 'Don\'t allow dependencies from src/shared to src/app, src/processes, src/pages, src/features, or src/entities',
      severity: 'error',
      from: {
        path: '^src/shared/'
      },
      to: {
        path: '^src/(app|processes|pages|features|entities)/'
      }
    },
    {
      name: 'not-to-test',
      comment: 'Don\'t allow dependencies from src/app, src/processes, src/pages, src/features, or src/entities to test files',
      severity: 'error',
      from: {
        path: '^src/(app|processes|pages|features|entities)/'
      },
      to: {
        path: '\\.(test|spec)\\.(ts|tsx|js|jsx)$'
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node'],
      extensionAlias: {
        '.js': ['.ts', '.tsx', '.js'],
        '.jsx': ['.tsx', '.jsx']
      }
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+'
      },
      archi: {
        collapsePattern: '^(packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+',
        theme: {
          graph: {
            splines: 'ortho'
          },
          modules: [
            {
              criteria: { matchesFocus: true },
              attributes: {
                fillcolor: 'lime'
              }
            },
            {
              criteria: { matchesReaches: true },
              attributes: {
                fillcolor: 'orange'
              }
            },
            {
              criteria: { matchesNot: { matchesFocus: true, matchesReaches: true } },
              attributes: {
                fillcolor: 'lightgrey'
              }
            }
          ]
        }
      }
    }
  }
}
