#!/usr/bin/perl

use warnings FATAL => 'all';
$seconds = $ARGV[0];
$file = $ARGV[1];
if ((!$seconds) || ($file eq "")) {
        die "Usage: silence seconds newfilename.wav\n";
}

open(OUT, ">/tmp/$$.dat");
print OUT "; SampleRate 8000\n";
$samples = $seconds * 8000;
for ($i = 0; ($i < $samples); $i++) {
        print OUT $i / 8000, "\t0\n";
}
close(OUT);

system("sox /tmp/$$.dat -b16 -r8000 -c1  $file");
#unlink("/tmp/$$.dat");