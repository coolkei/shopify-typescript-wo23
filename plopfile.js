module.exports = function(plop) {
  // controller generator
  plop.setGenerator("package", {
    description: "create a new package from scratch",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should this package's name be? Ex. react-utilities"
      }
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{name}}/package.json",
        templateFile: "templates/package.hbs.json"
      },
      {
        type: "add",
        path: "packages/{{name}}/tsconfig.json",
        templateFile: "templates/tsconfig.hbs.json"
      },
      {
        type: "add",
        path: "packages/{{name}}/README.md",
        templateFile: "templates/README.hbs.md"
      },
      {
        type: "add",
        path: "packages/{{name}}/src/index.ts",
        templateFile: "templates/index.hbs.ts"
      }
    ]
  });
};
