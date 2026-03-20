---
title: Controllable Context Sensitivity and the Knob Behind It
authors: Julian Minder, Kevin Du, Niklas Stoehr, Giovanni Monea, Chris Wendler, Robert West, Ryan Cotterell
year: 2024
---
For a model to succeed in the context task, it must execute these steps:
1. Extract the answer from model's prior knowledge
2. Extract the answer from the context
3. Decide whether to answer according to the context or prior knowledge

To follow either context or prior knowledge, they fine-tuned the model + few shot.

How about the truthfulness direction? Can we combine it here? Maybe if the truthfulness direction is high, we go for the prior knowledge?