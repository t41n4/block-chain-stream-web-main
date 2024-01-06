ffmpeg -i RickRoll_src.mp4 \
            -filter_complex "[0:v]split=3[v1][v2][v3]; \
                            [v1]copy[v1out]; \
                            [v2]scale=w=1280:h=720[v2out];\
                            [v3]scale=w=640:h=360[v3out]" \
            -map "[v1out]" -c:v:0 libx264 -b:v 2500k -f hls -g 30 -r 30 -s 1280x720 -preset superfast -sc_threshold 0 -keyint_min 48 \
            -map "[v2out]" -c:v:1 libx264 -b:v 1000k -f hls -g 30 -r 30 -s 854x480 -preset superfast -sc_threshold 0 -keyint_min 48 \
            -map "[v3out]" -c:v:2 libx264 -b:v 750k -f hls -g 30 -r 30 -s 640x360 -preset superfast -sc_threshold 0 -keyint_min 48 \
            -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
            -map a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
            -map a:0 -c:a:2 aac -b:a:2 48k -ac 2 \
            -f hls \
            -hls_time 2 \
            -hls_playlist_type vod \
            -hls_flags independent_segments \
            -hls_segment_type mpegts \
            -hls_segment_filename stream_%v/data%02d.ts \
            -master_pl_name master.m3u8 \
            -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" stream_%v.m3u8