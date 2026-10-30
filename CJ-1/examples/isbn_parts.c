#include <stdio.h>
int main(void) {
    int group, publisher, book;
    char check;
    if (scanf("%d-%d-%d-%c", &group, &publisher, &book, &check) != 4)
        return 1;
    printf("%d-%03d-%05d-%c\n", group, publisher, book, check);
    return 0;
}
