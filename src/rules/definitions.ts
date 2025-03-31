import { RuleProperties } from "json-rules-engine";

export const rules: RuleProperties[] = [
  // 🔴 RED
  {
    conditions: {
      any: [
        { fact: "windGust", operator: "greaterThan", value: 20.7 },   // Bft 8+
        { fact: "windSpeed", operator: "greaterThan", value: 17.1 },  // Bft 7+
        { fact: "temperature", operator: "lessThan", value: -2 }      // below -2°C
      ]
    },
    event: { type: "alert", params: { status: "red" } }
  },

  // 🟠 ORANGE
  {
    conditions: {
      any: [
        {
          all: [
            { fact: "windSpeed", operator: "greaterThanInclusive", value: 8.0 },   // Bft 5
            { fact: "windSpeed", operator: "lessThanInclusive", value: 17.1 }     // up to Bft 7
          ]
        },
        { fact: "windGust", operator: "greaterThan", value: 17.1 },               // gusts over Bft 7
        { fact: "temperature", operator: "lessThan", value: 0 }                   // below freezing
      ]
    },
    event: { type: "alert", params: { status: "orange" } }
  },

  // 🟢 GREEN
  {
    conditions: {
      all: [
        { fact: "windSpeed", operator: "lessThan", value: 8.0 },   // under Bft 5
        { fact: "windGust", operator: "lessThan", value: 13.9 }    // under Bft 6
      ]
    },
    event: { type: "alert", params: { status: "green" } }
  }
];
