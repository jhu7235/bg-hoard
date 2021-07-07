import {
  Tree,
  formatFiles,
  installPackagesTask,
  updateJson,
  readJson,
} from '@nrwl/devkit';

const getScopes = (nxJson: any) => {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags
        // take only those that point to scope
        .filter((tag: string) => tag.startsWith('scope:'))
    )
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return [...new Set(allScopes)];
};

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
  name: string;
  directory: ${joinScopes};
}`
  );
}

function setDefaultScope(nxJson: any) {
  const projectNames = Object.keys(nxJson.projects);
  projectNames.forEach((name) => {
    const { tags }: { tags: string[] } = nxJson.projects[name];
    console.log(name, tags);
    // if no scope add default scope from project's name
    if (!tags.find((v) => v.startsWith('scope:'))) {
      const defaultScope = name.split('-')[0];
      tags.push(`scope:${defaultScope}`);
    }
  });
}

export default async function (host: Tree, schema: any) {
  const nxJson = readJson(host, 'nx.json');
  const scopes = getScopes(nxJson);
  const indexFile = host.read('tools/generators/util-lib/index.ts').toString();
  const newFile = replaceScopes(indexFile, scopes);
  host.write('tools/generators/util-lib/index.ts', newFile);

  updateJson(host, 'workspace.json', (v) => {
    v.defaultProject = 'api';
    return v;
  });
  updateJson(host, 'nx.json', (v) => {
    v.defaultProject = 'api';
    setDefaultScope(v);
    return v;
  });
  // await libraryGenerator(host, { name: schema.name });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
