#include <stdio.h>
int main(void) {
    for (int i = 4; i >= 1; i--) {
        for (int j = 4; j >= 1; j--) {
            if (j <= i) printf("*");
            else printf(" ");
        }
        printf("\n");
    }
    return 0;
}
