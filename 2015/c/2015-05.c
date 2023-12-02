#include <stdio.h>
#include <string.h>

#include "tools.h"

int part1(char input[]) {
  char data[strlen(input)];
  const char vowels[5] = {'a', 'e', 'i', 'o', 'u'};
  const char blackList[4][2] = {"ab", "cd", "pq", "xy"};
  int niceCount = 0;

  strcpy(data, input);
  char *line = strtok(data, "\n");

  while (line != NULL) {
    int vowelCount     = 0;
    int doublesCount   = 0;
    int blackListCount = 0;

    for (int i = 0; i < strlen(line); i++) {
      // Find vowels
      for (int j = 0; j < sizeof(vowels); j++)
        if (line[i] == vowels[j]) vowelCount++;
    
      if (i+1 < strlen(line)) {
        // Find doubles
        if (line[i] == line[i+1]) doublesCount++;
    
        // Find blacklisted
        for (int j = 0; j < 4; j++) {
          if (line[i] == blackList[j][0] && line[i+1] == blackList[j][1]) blackListCount++;
        }

      }
    }

    if (vowelCount > 2 && doublesCount > 0 && blackListCount == 0) niceCount++;
    
    line = strtok(NULL, "\n");
  }
  
  return niceCount;
}

int part2(char input[]) {
  char data[strlen(input)];
  int niceCount = 0;

  strcpy(data, input);
  char *line = strtok(data, "\n");

  while (line != NULL) {
    int duplicationCount  = 0;
    int spaceBetweenCount = 0;

    for (int i = 0; i < strlen(line); i++) {
      char chars[2] = {line[i], line[i+1]};

      for (int j = i+2; j < strlen(line); j++) {
        if (line[j] == chars[0] && line[j+1] == chars[1]) duplicationCount++;
      }
      
      if (i+2 < strlen(line) && line[i] == line[i+2]) spaceBetweenCount++;
    }

    if (duplicationCount && spaceBetweenCount) niceCount++;

    line = strtok(NULL, "\n");
  }


  return niceCount;
}

int main() {
  char *data = getDataFromFile("../data/2015-05.txt");

  printf("Advent of code 2015 #5\n\n");

  printf("----Part 1----\n");
  test("Test 1", part1("ugknbfddgicrmopn"), 1);
  test("Test 2", part1("aaa"),              1);
  test("Test 3", part1("jchzalrnumimnmhp"), 0);
  test("Test 4", part1("haegwjzuvuyypxyu"), 0);
  test("Test 5", part1("dvszwmarrgswjxmb"), 0);
  printf("Answer: %d\n\n", part1(data));

  printf("----Part 2----\n");
  test("Test 1", part2("qjhvhtzxzqqjkmpb"), 1);
  test("Test 2", part2("xxyxx"),            1);
  test("Test 3", part2("uurcxstgmygtbstg"), 0);
  test("Test 4", part2("ieodomkazucvgmuy"), 0);
  printf("Answer: %d\n\n", part2(data));

  return 0;
}