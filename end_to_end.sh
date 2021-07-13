if [ $# -lt 1 ]; then
    echo No video file received
    exit 1
fi

rm -rf video_frames/
python extract_frames.py $1
printf "compressedData ="
python dump_compressed_data.py
cat github_activity_animator.js
