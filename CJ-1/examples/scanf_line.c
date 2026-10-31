#include <stdio.h>
int main(void) {
    char line[20];
    int matched = scanf("%19[^\n]", line);
    if (matched != 1) {
        printf("no text\n");
        return 0;
    }
    printf("[%s]\n", line);
    return 0;
}
