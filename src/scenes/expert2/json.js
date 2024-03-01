export const json = {
  title: "Expert Feedback",
  logoPosition: "right",
  pages: [
    {
      name: "Expert Report",
      elements: [
        {
          type: "panel",
          name: "expert-report",
          elements: [
            {
              type: "panel",
              name: "expertFindings",
              elements: [
                {
                  type: "boolean",
                  name: "expert",
                  title: "Is Dark Pattern Present in the Given link ?",
                },
                {
                  type: "boolean",
                  name: "countdown",
                  visibleIf: "{expert} = true",
                },
                {
                  type: "boolean",
                  name: "scarcity",
                  visibleIf: "{expert} = true",
                },
                {
                  type: "boolean",
                  name: "forced_continuity",
                  visibleIf: "{expert} = true",
                },
                {
                  type: "boolean",
                  name: "social_proof",
                  visibleIf: "{expert} = true",
                },
              ],
            },

            {
              type: "panel",
              name: "expert opinion",
              elements: [
                {
                  type: "panel",
                  name: "children",
                  elements: [
                    {
                      type: "text",
                      name: "opinion",
                      title:
                        "Please Write Your valuable opinion or Suggestion?",
                    },
                  ],
                },
              ],
              startWithNewLine: false,
            },
          ],
        },
      ],
      title: "Expeert Report ",
    },
  ],
  showQuestionNumbers: "off",
}
