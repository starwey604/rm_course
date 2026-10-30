#include <stdio.h>
int main(void) {
    char s[101];
    if (scanf("%100s", s) != 1) return 1;
    for (int i = 0; s[i] != '\0'; i++)
        if (s[i] >= 'a' && s[i] <= 'z')
            s[i] = s[i] - ('a' - 'A');
    printf("%s\n", s);
    return 0;
}
