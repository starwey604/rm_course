#include <stdio.h>
int main(void) {
    int n, value = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int row = n; row >= 1; row--) {
        for (int col = 0; col < row; col++)
            printf("%02d", ++value);
        printf("\n");
    }
    return 0;
}
