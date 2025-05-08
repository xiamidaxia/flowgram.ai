import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';

import { bfsMaterials, copyMaterial, listAllMaterials } from './materials.js';
import { getProjectInfo, installDependencies } from './project.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Add official materials to your project')
  .action(async () => {
    console.log(chalk.bgGreenBright('Welcome to @flowgram.ai/form-materials CLI!'));

    const projectInfo = getProjectInfo();

    console.log(chalk.bold('Project Info:'));
    console.log(chalk.black(`  - Flowgram Version: ${projectInfo.flowgramVersion}`));
    console.log(chalk.black(`  - Project Path: ${projectInfo.projectPath}`));

    const materials = listAllMaterials();

    // 2. User select one component
    const { material } = await inquirer.prompt([
      {
        type: 'list',
        name: 'material',
        message: 'Select one material to add:',
        choices: [
          ...materials.map((_material) => ({
            name: `${_material.type}/${_material.name}`,
            value: _material,
          })),
        ],
      },
    ]);

    console.log(material);

    // 3. Get the component dependencies by BFS (include depMaterials and depPackages)
    const { allMaterials, allPackages } = bfsMaterials(material, materials);

    // 4. Install the dependencies
    let flowgramPackage = `@flowgram.ai/editor`;
    if (projectInfo.flowgramVersion !== 'workspace:*') {
      flowgramPackage = `@flowgram.ai/editor@${projectInfo.flowgramVersion}`;
    }
    const packagesToInstall = [flowgramPackage, ...allPackages];

    console.log(chalk.bold('These npm dependencies will be added to your project'));
    console.log(packagesToInstall);
    installDependencies(packagesToInstall, projectInfo);

    // 5. Copy the materials to the project
    console.log(chalk.bold('These Materials will be added to your project'));
    console.log(allMaterials);
    allMaterials.forEach((material) => {
      copyMaterial(material, projectInfo);
    });
  });

program.parse(process.argv);
