#include <stdio.h>
int main(void) {
    char s[100];
    int count = 0;
    if (!fgets(s, sizeof(s), stdin)) return 1;
    for (int i = 0; s[i] != '\0'; i++)
        if (s[i] != ' ' && s[i] != '\n' && s[i] != '\r') count++;
    printf("%d\n", count);
    return 0;
}
