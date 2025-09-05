/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import chalk from "chalk";
import { ImportDeclaration } from "../utils/import";
import { Project } from "../utils/project";
import { getIndexTsFile, traverseRecursiveTsFiles } from "../utils/ts-file";
import { Material } from "./materials";

export function executeRefreshProjectImport(
  project: Project,
  material: Material,
) {
  const materialFile = getIndexTsFile(material.path);

  if (!materialFile) {
    console.warn(`Material ${material.name} not found`);
    return;
  }

  const targetDir = `@/form-materials/${material.type}/${material.name}`;

  const exportNames = materialFile.allExportNames;

  console.log(`👀 The exports of ${material.name} is ${exportNames.join(",")}`);

  for (const tsFile of traverseRecursiveTsFiles(project.srcPath)) {
    for (const importDeclaration of tsFile.imports) {
      if (importDeclaration.source === "@flowgram.ai/form-materials") {
        const currentMaterialImports = importDeclaration.namedImports?.filter(
          (item) => exportNames.includes(item.imported),
        );
        if (!currentMaterialImports?.length) {
          continue;
        }
        const nextImports: ImportDeclaration[] = [
          {
            ...importDeclaration,
            namedImports: currentMaterialImports,
            source: targetDir,
          },
        ];

        const keepImportNames = importDeclaration.namedImports?.filter(
          (item) => !exportNames.includes(item.imported),
        );

        if (keepImportNames?.length) {
          nextImports.unshift({
            ...importDeclaration,
            namedImports: keepImportNames,
          });
        }

        tsFile.replaceImport([importDeclaration], nextImports);
        console.log(chalk.green(`🔄 Refresh Imports In: ${tsFile.path}`));

        console.log(
          `From:\n${importDeclaration.statement}\nTo:\n${nextImports
            .map((item) => item.statement)
            .join("\n")}`,
        );
      }
    }
  }
}
