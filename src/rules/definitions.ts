import { RuleProperties } from "json-rules-engine";

export const rules: RuleProperties[] = [
  // 🔴 RED (high priority)
  {
    conditions: {
      any: [
        { fact: "windGust", operator: "greaterThan", value: 17.1 }, // Bft 8+
        { fact: "windSpeed", operator: "greaterThan", value: 17.1 }, // Bft 7+
        { fact: "temperature", operator: "lessThan", value: -2 }
      ]
    },
    event: { type: "alert", params: { status: "red" } }
  },

  // 🟠 ORANGE (fires only if NOT red)
  {
    conditions: {
      all: [
        {
          any: [
            {
              all: [
                { fact: "windSpeed", operator: "greaterThanInclusive", value: 8.0 },
                { fact: "windSpeed", operator: "lessThanInclusive", value: 17.1 }
              ]
            },
            { fact: "windGust", operator: "greaterThan", value: 13.8 },
            { fact: "temperature", operator: "lessThan", value: 0 }
          ]
        },
        {
          not: {
            any: [
              { fact: "windGust", operator: "greaterThan", value: 17.1 },
              { fact: "windSpeed", operator: "greaterThan", value: 17.1 },
              { fact: "temperature", operator: "lessThan", value: -2 }
            ]
          }
        }
      ]
    },
    event: { type: "alert", params: { status: "orange" } }
  },
  

  // 🟢 GREEN (fires only if NOT red or orange)
  {
    conditions: {
      all: [
        { fact: "windSpeed", operator: "lessThan", value: 8.0 },
        { fact: "windGust", operator: "lessThan", value: 13.9 },
        { fact: "temperature", operator: "greaterThanInclusive", value: 0 }
      ]
    },
    event: { type: "alert", params: { status: "green" } }
  }
];
