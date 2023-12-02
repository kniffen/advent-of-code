#include <stdio.h>
#include <stdlib.h>

void test(char name[], int actual, int expected) {
  if (actual == expected) {
    printf("%s: passed!\n", name);
    return;
  }
  
  printf("%s: failed!\nExpected %i got %i\n\n", name, expected, actual);
}

char *getDataFromFile(char filePath[]) {
  FILE *fp;
  char ch;
  char *data;
  int length;
  int pos = 0;

  fp = fopen(filePath, "r");
  
  while ((ch = fgetc(fp)) != EOF) length++;

  rewind(fp);
  
  data = (char *) malloc(length * sizeof(char));
  ch   = fgetc(fp);

  while (ch != EOF) {
    data[pos] = ch;
    pos++;
    ch = fgetc(fp);
  }

  fclose(fp);

  return data;
}