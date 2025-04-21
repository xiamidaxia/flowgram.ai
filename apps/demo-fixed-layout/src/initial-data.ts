import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      blocks: [],
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              default: 'Hello Flow.',
            },
          },
        },
      },
    },
    {
      id: 'llm_0',
      type: 'llm',
      blocks: [],
      data: {
        title: 'LLM',
        inputsValues: {
          modelType: 'gpt-3.5-turbo',
          temperature: 0.5,
          systemPrompt: 'You are an AI assistant.',
          prompt: '',
        },
        inputs: {
          type: 'object',
          required: ['modelType', 'temperature', 'prompt'],
          properties: {
            modelType: {
              type: 'string',
            },
            temperature: {
              type: 'number',
            },
            systemPrompt: {
              type: 'string',
            },
            prompt: {
              type: 'string',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: { type: 'string' },
          },
        },
      },
    },
    {
      id: 'loop_0',
      type: 'loop',
      data: {
        title: 'Loop',
      },
      blocks: [
        {
          id: 'condition_0',
          type: 'condition',
          data: {
            title: 'Condition',
          },
          blocks: [
            {
              id: 'branch_0',
              type: 'block',
              data: {
                title: 'If_0',
                inputsValues: {
                  condition: '',
                },
                inputs: {
                  type: 'object',
                  required: ['condition'],
                  properties: {
                    condition: {
                      type: 'boolean',
                    },
                  },
                },
              },
              blocks: [],
            },
            {
              id: 'branch_1',
              type: 'block',
              data: {
                title: 'If_1',
                inputsValues: {
                  condition: '',
                },
                inputs: {
                  type: 'object',
                  required: ['condition'],
                  properties: {
                    condition: {
                      type: 'boolean',
                    },
                  },
                },
              },
              meta: {},
              blocks: [],
            },
          ],
        },
      ],
    },
    {
      id: 'tryCatch_0',
      type: 'tryCatch',
      data: {
        title: 'TryCatch',
      },
      blocks: [
        {
          id: 'tryBlock_0',
          type: 'tryBlock',
          blocks: [],
        },
        {
          id: 'catchBlock_0',
          type: 'catchBlock',
          data: {
            title: 'Catch Block 1',
            inputsValues: {
              condition: '',
            },
            inputs: {
              type: 'object',
              required: ['condition'],
              properties: {
                condition: {
                  type: 'boolean',
                },
              },
            },
          },
          blocks: [],
        },
        {
          id: 'catchBlock_1',
          type: 'catchBlock',
          data: {
            title: 'Catch Block 2',
            inputsValues: {
              condition: '',
            },
            inputs: {
              type: 'object',
              required: ['condition'],
              properties: {
                condition: {
                  type: 'boolean',
                },
              },
            },
          },
          blocks: [],
        },
      ],
    },
    {
      id: 'end_0',
      type: 'end',
      blocks: [],
      data: {
        title: 'End',
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
  ],
};
