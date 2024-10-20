FROM node:carbon-buster
LABEL MAINTAINER="Subash SN"

# NONE OF THIS WORKS
## Need to update glibc version to 2.29
#RUN apt-get update && apt-get install -y gawk bison
#RUN wget -c https://ftp.gnu.org/gnu/glibc/glibc-2.29.tar.gz
#RUN tar -zxf glibc-2.29.tar.gz
#RUN mkdir glibc-2.29/build
#RUN rm -f glibc-2.29.tar.gz
#RUN cd glibc-2.29/build && ../configure --prefix=/opt/glibc-2.29
#RUN cd glibc-2.29/build && make -j$(nproc)
#RUN cd glibc-2.29/build && make install
#RUN cd / && rm -rf glibc-2.29
#
##    export LD_LIBRARY_PATH=/opt/glibc-2.29/lib:$LD_LIBRARY_PATH && \
#
#RUN pwd && ls -l
#RUN ls -l /opt/glibc-2.29/lib
#RUN echo "/opt/glibc-2.29/lib" | tee /etc/ld.so.conf.d/glibc-2.29.conf
#RUN mv /etc/ld.so.conf.d/libc.conf /etc/ld.so.conf.d/libc.bak_conf
#RUN LD_LIBRARY_PATH="/opt/glibc-2.29/lib" ldconfig
#
##RUN echo "export LD_LIBRARY_PATH=/opt/glibc-2.29/lib" >> ~/.bashrc
##RUN echo "export LD_LIBRARY_PATH=/opt/glibc-2.29/lib" >> /etc/profile
##RUN echo "export LD_LIBRARY_PATH=/opt/glibc-2.29/lib" >> /etc/bash.bashrc
#
#RUN echo "LD_LIBRARY_PATH is: $LD_LIBRARY_PATH"
#
#RUN LD_LIBRARY_PATH="/opt/glibc-2.29/lib" ldd --version
##ENV LD_LIBRARY_PATH="/opt/glibc-2.29/lib"
##RUN echo "LD_LIBRARY_PATH is: $LD_LIBRARY_PATH"
##ENV LD_LIBRARY_PATH="/opt/glibc-2.29/lib:"
#RUN pwd && ls -l

WORKDIR /app
COPY package*.json ./

# Create logs directory
RUN mkdir -p logs

RUN npm install > logs/npm_install_output.txt 2>&1
RUN cat logs/npm_install_output.txt

COPY . .

CMD ["npm", "start"]
