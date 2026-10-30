#include <stdio.h>
#include <string.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        char a[10], b[10];
        if (scanf("%9s %9s", a, b) != 2) return 1;
        if (strcmp(a, b) == 0) puts("Tie");
        else if ((strcmp(a, "Rock") == 0 && strcmp(b, "Scissors") == 0)
              || (strcmp(a, "Scissors") == 0 && strcmp(b, "Paper") == 0)
              || (strcmp(a, "Paper") == 0 && strcmp(b, "Rock") == 0))
            puts("Player1");
        else puts("Player2");
    }
    return 0;
}
