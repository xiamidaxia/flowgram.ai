/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import download from 'download';

export async function getLatestVersion(packageName: string): Promise<string> {
  return execSync(`npm view ${packageName} version --tag=latest`)
    .toString()
    .trim();
}

export async function loadNpm(packageName: string): Promise<string> {
  const packageLatestVersion = await getLatestVersion(packageName);

  const packagePath = path.join(
    __dirname,
    `./.download/${packageName}-${packageLatestVersion}`,
  );

  if (existsSync(packagePath)) {
    return packagePath;
  }

  // download else
  try {
    const tarballUrl = execSync(
      `npm view ${packageName}@${packageLatestVersion} dist.tarball`,
    )
      .toString()
      .trim();
    await download(tarballUrl, packagePath, { extract: true, strip: 1 });
    return packagePath;
  } catch (error) {
    console.error(`Error downloading or extracting package: ${error}`);
    throw error;
  }
}

