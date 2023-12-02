#include <stdio.h>
#include <string.h>

#include "tools.h"

void splitLine(char line[], char *sentence[], int length) {
  int pos = 0;
  char *word = strtok(line, " ");

  while (word != NULL) {
    sentence[pos] = word;
    pos++;
    word = strtok(NULL, " ");
  }
}

void setCoord(int *coord, char str[]) {
  coord[0] = atoi(strtok(str,  ","));
  coord[1] = atoi(strtok(NULL, ","));
}

int part1(char input[]) {
  char data[strlen(input)];
  int *grid[1000];
  
  for (int i = 0; i< 1000; i++) {
    grid[i] = (int *) malloc(1000 * sizeof(int));
  }

  for (int i = 0; i< 1000; i++) {
    for (int j = 0; j< 1000; j++) {
      grid[i][j] = 0;
    }
  }

  strcpy(data, input);

  char *endLine;
  char *line = strtok_r(data, "\n", &endLine);

  while (line != NULL) {
    char *sentence[7];
    splitLine(line, sentence, 7);
    int startCoord[2] = {0, 0};
    int endCoord[2]   = {0, 0};

    if (strcmp(sentence[0], "toggle") == 0) {
      setCoord(startCoord, sentence[1]);
      setCoord(endCoord,   sentence[3]);
    } else {
      setCoord(startCoord, sentence[2]);
      setCoord(endCoord,   sentence[4]);
    }

    for (int i = startCoord[0]; i <= endCoord[0]; i++) {
      for (int j = startCoord[1]; j <= endCoord[1]; j++) {
        if (sentence[1][1] == 'n') {
          grid[i][j] = 1;
        } else if (sentence[1][1] == 'f') {
          grid[i][j] = 0;
        } else {
          grid[i][j] = !grid[i][j];
        }
      }
    }

    line = strtok_r(NULL, "\n", &endLine);
  }

  int count = 0;
  for (int i = 0; i < 1000; i++) {
    for (int j = 0; j < 1000; j++) {
      if (grid[i][j]) count++;
    }
  }

  return count;
}

int part2(char input[]) {
  char data[strlen(input)];
  int *grid[1000];
  
  for (int i = 0; i< 1000; i++) {
    grid[i] = (int *) malloc(1000 * sizeof(int));
  }

  for (int i = 0; i< 1000; i++) {
    for (int j = 0; j< 1000; j++) {
      grid[i][j] = 0;
    }
  }

  strcpy(data, input);

  char *endLine;
  char *line = strtok_r(data, "\n", &endLine);

  while (line != NULL) {
    char *sentence[7];
    splitLine(line, sentence, 7);
    int startCoord[2] = {0, 0};
    int endCoord[2]   = {0, 0};

    if (strcmp(sentence[0], "toggle") == 0) {
      setCoord(startCoord, sentence[1]);
      setCoord(endCoord,   sentence[3]);
    } else {
      setCoord(startCoord, sentence[2]);
      setCoord(endCoord,   sentence[4]);
    }

    for (int i = startCoord[0]; i <= endCoord[0]; i++) {
      for (int j = startCoord[1]; j <= endCoord[1]; j++) {
        if (sentence[1][1] == 'n') {
          grid[i][j] += 1;
        } else if (sentence[1][1] == 'f') {
          grid[i][j] -= 1;
        } else {
          grid[i][j] += 2;
        }

        if (grid[i][j] < 0) grid[i][j] = 0;
      }
    }

    line = strtok_r(NULL, "\n", &endLine);
  }  


  int totalBrightness = 0;
  for (int i = 0; i < 1000; i++) {
    for (int j = 0; j < 1000; j++) {
      totalBrightness += grid[i][j];
    }
  }

  return totalBrightness;
}

int main() {
  char *data = getDataFromFile("../data/2015-06.txt");

  printf("Advent of code 2015 #6\n\n");

  printf("----Part 1----\n");
  test("Test 1", part1("turn on 0,0 through 999,999"),      1000000);
  test("Test 2", part1("toggle 0,0 through 999,0"),         1000);
  test("Test 3", part1("turn off 499,499 through 500,500"), 0);
  printf("Answer: %d\n\n", part1(data));

  printf("----Part 2----\n");
  test("Test 1", part2("turn on 0,0 through 0,0"), 1);
  test("Test 2", part2("toggle 0,0 through 999,999"), 2000000);
  printf("Answer: %d\n\n", part2(data));

  return 0;
}