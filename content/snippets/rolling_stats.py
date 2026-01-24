"""Helper snippet used in documentation to demonstrate external Python imports."""

from statistics import mean, pstdev


def report(label, samples):
    avg = mean(samples)
    spread = pstdev(samples)
    print(f"{label}:")
    print(f"  mean = {avg:.2f}")
    print(f"  stdev = {spread:.3f}")
    assert spread >= 0, "Standard deviation should be non-negative"
    return avg, spread


if __name__ == "__main__":
    BASELINE = [3.5, 4.0, 4.5, 5.0, 5.5]
    avg, spread = report("baseline latency", BASELINE)
    assert 3.0 <= avg <= 6.0
    assert spread < 1.0
