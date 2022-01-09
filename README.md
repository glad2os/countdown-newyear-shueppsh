#K8s CentOS 7
[How to Install a Kubernetes Cluster on CentOS 7](https://phoenixnap.com/kb/how-to-install-kubernetes-on-centos)

## Step 1: Configure Kubernetes Repository
```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
```

## Step 2: Install Docker

```sh
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
```

## Step 3: Configure driver docker

```shell
systemctl start docker
cat << EOF > /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF
systemctl daemon-reload
systemctl restart docker
systemctl enable docker
```

## Step 4: Configure firewall
```shell
sudo firewall-cmd --permanent --add-port=6443/tcp
sudo firewall-cmd --permanent --add-port=2379-2380/tcp
sudo firewall-cmd --permanent --add-port=10250/tcp
sudo firewall-cmd --permanent --add-port=10251/tcp
sudo firewall-cmd --permanent --add-port=10252/tcp
sudo firewall-cmd --permanent --add-port=10255/tcp
sudo firewall-cmd --reload
cat <<EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system
```

## Step 5 Disable SELinux

```shell
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```

## Step 6 Disable SWAP

```shell
sudo sed -i '/swap/d' /etc/fstab
sudo swapoff -a
```

## Step 7: Set Hostname on Nodes
```shell
sudo hostnamectl set-hostname master-node
sudo vi /etc/hosts
```

Make a host entry or DNS record to resolve the hostname for all nodes:

```shell
192.168.1.10 master.phoenixnap.com master-node
192.168.1.20 node1. phoenixnap.com node1 worker-node
```

## Step 8: Install k8s software

```shell 
sudo yum install -y kubelet kubeadm kubectl
systemctl enable kubelet
systemctl start kubelet
```

## Step 9: Create Cluster with kubeadm
```shell
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

## Step 10: Configure networking

```shell
kubectl create -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

# Adding external IP

```shell
scp glad2os@10.14.88.45:/etc/kubernetes/admin.conf .
kubectl -n kube-system get configmap kubeadm-config -o jsonpath='{.data.ClusterConfiguration}' > kubeadm.yaml
```

### adding external IP (UTF8)

```yaml
apiServer:
  certSANs:
    - "213.108.174.255"
  extraArgs:
    authorization-mode: Node,RBAC
```


### Upload new file to master node
```shell
scp .\kubeadm.yaml root@10.14.88.45:
mv /etc/kubernetes/pki/apiserver.{crt,key} ~
kubeadm init phase certs apiserver --config kubeadm.yaml
kubeadm init phase upload-config kubeadm --config kubeadm.yaml
```


# Download CA cert
```shell
scp root@10.14.88.45:/etc/kubernetes/pki/ca.crt .
```