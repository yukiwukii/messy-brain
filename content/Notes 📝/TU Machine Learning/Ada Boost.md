The main idea is to create many weak classifiers and then do voting. 

The simple idea is this:
1. We try to use each features to see which one classifies best. 
2. For the misclassified examples using the best classifier, we put more weight into it.
3. Then, we sample a new dataset and prioritizing the misclassified examples.
4. We repeat to step 1 until a set amount of step.
5. During inference, we do voting using the "best trees" for each round.

