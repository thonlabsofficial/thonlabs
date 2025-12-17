/** biome-ignore-all lint/suspicious/noConsole: script */

interface DeployConfig {
  [project: string]: {
    [environment: string]: {
      serviceId: string;
    };
  };
}

const config: DeployConfig = {
  main: {
    prod: {
      serviceId: 'f0bcca10-7846-4f20-b9f3-ea4bc2e7def1',
    },
  },
  www: {
    prod: {
      serviceId: '2d0b93bf-1edd-4aff-a3a3-ef7dc9950549',
    },
  },
};

async function deploy(project: string, environment: string) {
  const projectConfig = config[project]?.[environment];

  if (!projectConfig) {
    console.error(`❌ Configuration not found for ${project}:${environment}`);
    process.exit(1);
  }

  const { serviceId } = projectConfig;

  console.log('\n========================================');
  console.log(`🚀 Deploying ${project} to ${environment}`);
  console.log(`📦 Service ID: ${serviceId}`);
  console.log('========================================\n');
  try {
    // console.log('🔐 Logging in to GitHub Container Registry\n');
    // await exec(
    //   `echo "${process.env.GITHUB_TOKEN}" | docker login ghcr.io -u guscsales --password-stdin`,
    // );
    // console.log('✅ Logged in to GitHub Container Registry\n');

    // console.log('🔨 Building and pushing image\n');
    // await exec(`docker buildx build --progress=plain --file ${dockerfile || 'Dockerfile.build'} \\
    //   --platform ${platformStr} \\
    //   --build-arg BUILD_PROJECT=${project} \\
    //   -t ghcr.io/guscsales/thonlabs-${project}:${registryTag} \\
    //   --push .`);
    // console.log('✅ Image built and pushed\n');

    console.log('🚂 Deploying to Railway\n');
    await exec(
      `RAILWAY_TOKEN=${process.env.RAILWAY_TOKEN} railway up --service=${serviceId}`,
    );
    console.log('✅ Deployed to Railway in background\n');

    console.log(
      '✅ Deployment completed successfully, check Railway for details!\n',
    );
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// Helper function to execute shell commands
function exec(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const child = spawn('sh', ['-c', command], { stdio: 'inherit' });

    child.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

// Parse command line arguments
const [project, environment] = process.argv.slice(2);

if (!project || !environment) {
  console.log('Usage: tsx deploy.ts <project> <environment>');
  console.log('Example: tsx deploy.ts main development');
  process.exit(1);
}

deploy(project, environment);
