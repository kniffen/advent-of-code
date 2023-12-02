#include <stdio.h>
#include <string.h>

#include "tools.h"

int part1(char input[]) {
  const int length = strlen(input);
  int visited[length];
  int pos = 0;
  int nextVisited = 1;

  // Initialize visited
  for (int i = 0; i <= length; i++) visited[i] = 0;

  for (int i = 0; i < length; i++) {
    switch (input[i]) {
      case '<':
        pos--;
        break;

      case '>':
        pos++;
        break;

      case '^':
        pos -= length;
        break;

      case 'v':
        pos += length;
        break;
    }

    int alreadyExists = 0;
    for (int j = 0; j <= length; j++)
      if (visited[j] == pos) alreadyExists = 1;

    if (!alreadyExists) {
      visited[nextVisited] = pos;
      nextVisited++;
    }
  }

  int amountVisited = 1;
  for (int i = 0; i <= length; i++)
    if (visited[i] != 0) amountVisited++;

  return amountVisited;
}

int part2(char input[]) {
  const int length = strlen(input);
  int visited[length];
  int pos[2] = {0, 0};
  int nextVisited = 1;

  // Initialize visited
  for (int i = 0; i <= length; i++) visited[i] = 0;

  for (int i = 0; i < length; i++) {
    int index = i % 2;

    switch (input[i]) {
      case '<':
        pos[index]--;
        break;

      case '>':
        pos[index]++;
        break;

      case '^':
        pos[index] -= length;
        break;

      case 'v':
        pos[index] += length;
        break;
    }

    int alreadyExists = 0;
    for (int j = 0; j <= length; j++)
      if (visited[j] == pos[index]) alreadyExists = 1;

    if (!alreadyExists) {
      visited[nextVisited] = pos[index];
      nextVisited++;
    }
  }

  int amountVisited = 1;
  for (int i = 0; i <= length; i++)
    if (visited[i] != 0) amountVisited++;

  return amountVisited;
}

int main() {
  char *data = getDataFromFile("../data/2015-03.txt");

  printf("Advent of code 2015 #03\n\n");

  printf("----Part 1----\n");
  test("Test 1", part1(">"),          2);
  test("Test 2", part1("^>v<"),       4);
  test("Test 3", part1("^v^v^v^v^v"), 2);
  printf("Answer: %d\n\n", part1(data));

  printf("----Part 2----\n");
  test("Test 1", part2("^v"),          3);
  test("Test 2", part2("^>v<"),        3);
  test("Test 3", part2("^v^v^v^v^v"), 11);
  printf("Answer: %d\n\n", part2(data));

  return 0;
}