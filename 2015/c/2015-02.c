#include <stdio.h>
#include <string.h>

#include "tools.h"

void sort(int *arr) {
  int swapped;
  
  while (1) {
    swapped = 0;

    for (int i = 0; i < 2; i++) {
      if (arr[i] > arr[i + 1]) {
        int tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = 1;
      } 
    }

    if (swapped == 0) break;
  }
}


int part1(char input[]) {
  int output = 0;
  char data[strlen(input)];

  strcpy(data, input);

  char *endLine;
  char *line = strtok_r(data, "\n", &endLine);

  while (line != NULL) {
    int l, w, h;
    int sides[3];

    l = atoi(strtok(line, "x"));
    w = atoi(strtok(NULL, "x"));
    h = atoi(strtok(NULL, "x"));

    sides[0] = l * w;
    sides[1] = w * h;
    sides[2] = h * l;

    sort(sides);

    output += 2 * sides[0];
    output += 2 * sides[1];
    output += 2 * sides[2];
    output += sides[0];

    line = strtok_r(NULL, "\n", &endLine);
  }

  return output;
}

int part2(char input[]) {
  int output = 0;
  char data[strlen(input)];

  strcpy(data, input);

  char *endLine;
  char *line = strtok_r(data, "\n", &endLine);

  while (line != NULL) {
    int dims[3];

    dims[0] = atoi(strtok(line, "x"));
    dims[1] = atoi(strtok(NULL, "x"));
    dims[2] = atoi(strtok(NULL, "x"));

    sort(dims);

    output += dims[0] + dims[0];
    output += dims[1] + dims[1];
    output += dims[0] * dims[1] * dims[2];

    line = strtok_r(NULL, "\n", &endLine);
  }

  return output;
}

int main() {
  char *data = getDataFromFile("../data/2015-02.txt");

  printf("Advent of code 2015 #02\n\n");

  printf("----Part 1----\n");
  test("Test 1", part1("2x3x4"),  58);
  test("Test 2", part1("1x1x10"), 43);
  printf("Answer: %d\n\n", part1(data));

  printf("----Part 2----\n");
  test("Test 1", part2("2x3x4"),  34);
  test("Test 2", part2("1x1x10"), 14);
  printf("Answer: %d\n\n", part2(data));

  return 0;
}