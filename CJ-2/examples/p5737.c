#include <stdio.h>

int is_leap(int year) {
    if (year % 400 == 0) return 1;
    if (year % 4 == 0 && year % 100 != 0) return 1;
    return 0;
}

void print_years(int years[], int n) {
    printf("%d\n", n);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", years[i]);
    }
    printf("\n");
}

void collect(int x, int y) {
    int years[1500], n = 0;
    for (int year = x; year <= y; year++) {
        if (is_leap(year)) {
            years[n] = year;
            n++;
        }
    }
    print_years(years, n);
}

int main(void) {
    int x, y;
    if (scanf("%d %d", &x, &y) != 2) return 0;
    collect(x, y);
}
