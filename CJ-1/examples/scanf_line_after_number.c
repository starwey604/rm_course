#include <stdio.h>
int main(void) {
    int age;
    char name[20];
    if (scanf("%d", &age) != 1) return 1;
    if (scanf(" %19[^\n]", name) != 1) return 1;
    printf("%d [%s]\n", age, name);
    return 0;
}
