# Angry Cows

Bessie the cow has designed what she thinks will be the next big hit video game: "Angry Cows". The premise, which she believes is completely original, is that the player shoots cows with a slingshot into a one-dimensional scene consisting of a set of hay bales located at various points on a number line. Each cow lands with sufficient force to detonate the hay bales in close proximity to her landing site. The goal is to use a set of cows to detonate all the hay bales.
There are N hay bales located at distinct integer positions x1,x2,…,xN on the number line. If a cow is launched with power R landing at position x, this will causes a blast of "radius R", destroying all hay bales within the range x−R…x+R.

A total of K cows are available to shoot, each with the same power R. Please determine the minimum integer value of R such that it is possible to use the K cows to detonate every single hay bale in the scene.

## Input

The first line of input contains N (1≤N≤50,000) and K (1≤K≤10). The remaining N lines all contain integers x1…xN (each in the range 0…1,000,000,000).

## Output

Please output the minimum power R with which each cow must be launched in order to detonate all the hay bales.

## Sample Input

```
7 2
20
25
18
8
10
3
1
```

## Sample Output

```
5
```
