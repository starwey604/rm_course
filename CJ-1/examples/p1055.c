#include <stdio.h>
int main(void) {
    char s[14];
    if (scanf("%13s", s) != 1) return 1;
    int sum = 0, weight = 1;
    for (int i = 0; i < 12; i++) {
        if (s[i] == '-') continue;
        sum += (s[i] - '0') * weight;
        weight++;
    }
    int remainder = sum % 11;
    char check;
    if (remainder == 10) {
        check = 'X';
    } else {
        check = '0' + remainder;
    }
    if (s[12] == check) puts("Right");
    else { s[12] = check; puts(s); }
    return 0;
}
