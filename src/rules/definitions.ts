import { RuleProperties } from "json-rules-engine";

export const rules: RuleProperties[] = [
  {
    conditions: {
      any: [
        { fact: "temperature", operator: "greaterThan", value: 30 },
        { fact: "windGust", operator: "greaterThan", value: 15 }
      ]
    },
    event: { type: "alert", params: { status: "red" } }
  },
  {
    conditions: {
      any: [
        {
          all: [
            { fact: "temperature", operator: "greaterThan", value: 20 },
            { fact: "temperature", operator: "lessThan", value: 30 }
          ]
        },
        {
          all: [
            { fact: "windGust", operator: "greaterThan", value: 10 },
            { fact: "windGust", operator: "lessThan", value: 15 }
          ]
        }
      ]
    },
    event: { type: "alert", params: { status: "orange" } }
  },
  {
    conditions: {
      all: [
        { fact: "temperature", operator: "lessThan", value: 20 },
        { fact: "windGust", operator: "lessThan", value: 10 }
      ]
    },
    event: { type: "alert", params: { status: "green" } }
  }
];
