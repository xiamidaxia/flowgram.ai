/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Command } from "commander";

import { syncMaterial } from "./materials";
import { createApp } from "./create-app";

const program = new Command();

program.name("flowgram-cli").version("1.0.0").description("Flowgram CLI");

program
  .command("create-app")
  .description("Create a new flowgram project")
  .argument('[string]', 'Project name')
  .action(async (projectName) => {
    await createApp(projectName);
  });

program
  .command("materials")
  .description("Sync materials to the project")
  .argument('[string]', 'Material name')
  .action(async (materialName) => {
    await syncMaterial(materialName);
  });

program.parse(process.argv);
