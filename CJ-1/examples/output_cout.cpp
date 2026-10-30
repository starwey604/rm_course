#include <iostream>
#include <iomanip>
int main() {
    int sum = 6;
    double avg = 2.0;
    std::cout << "sum=" << sum << ", avg="
              << std::fixed << std::setprecision(2) << avg << '\n';
}
