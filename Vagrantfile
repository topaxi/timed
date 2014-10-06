# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.hostname = 'timed'

  config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'
  
  config.vm.box = 'ubuntu-trusty-server'
  config.vm.guest = :ubuntu

  config.hostsupdater.aliases = [ 'timed.vm' ]

  config.vm.provider 'virtualbox' do |v|
     v.customize [ 'storagectl', :id, '--name', 'SATAController', '--hostiocache', 'on' ]
     v.customize [ 'modifyvm',   :id, '--cpus',       2 ]
     v.customize [ 'modifyvm',   :id, '--memory',   512 ]
  end

  config.vm.network :private_network, :ip => '192.168.42.23'
  config.vm.network :public_network

  config.ssh.forward_agent = true
  
  config.vm.provision :shell, :path => 'tools/vagrant/provision.sh'
end
