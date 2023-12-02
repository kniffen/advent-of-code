#include <stdio.h>
#include <string.h>

#include "tools.h"

int part1(char data[]) {
  int output = 0;

  int i;
  for (i = 0; i < strlen(data); i++) {
    if (data[i] == '(') {
      output++;
    } else if(data[i] == ')') {
      output--;
    }

  }

  return output;
}

int part2(char data[]) {
  int output = 0;
  int i;
  int pos = 0;

  for (i = 0; i < strlen(data); i++) {
    if (data[i] == '(') {
      pos++;
    } else if (data[i] == ')') {
      pos--;
    }

    if (pos == -1) {
      output = i + 1;
      break;
    }
  }

  return output;
}

int main() {
  char *data = getDataFromFile("../data/2015-01.txt");

  printf("Advent of code 2015 #01\n\n");

  printf("----Part 1----\n");
  test("Test 1", part1("(())"),     0);
  test("Test 2", part1("()()"),     0);
  test("Test 3", part1("((("),      3);
  test("Test 4", part1("(()(()("),  3);
  test("Test 5", part1("))((((("),  3);
  test("Test 6", part1("())"),     -1);
  test("Test 7", part1("))("),     -1);
  test("Test 8", part1(")))"),     -3);
  test("Test 9", part1(")())())"), -3);
  printf("Answer: %d\n\n", part1(data));


  printf("----Part 2----\n");
  test("Test 1", part2(")"),     1);
  test("Test 2", part2("()())"), 5);
  printf("Answer: %d\n\n", part2(data));

  return 0;
}